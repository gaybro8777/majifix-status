import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Status from '../../src/status.model';

describe('Status', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const { jurisdiction } = Status.schema.tree;
      const { instance } = Status.schema.paths.jurisdiction;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autopopulate).to.exist;
    });

    describe('name', () => {
      it('should be an embedded sub-document', () => {
        const { name } = Status.schema.tree;
        const { instance } = Status.schema.paths.name;
        const { tree } = Status.schema.tree.name;

        expect(instance).to.be.equal('Embedded');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have name `en` locale field', () => {
        const { instance } = Status.schema.paths.name.schema.paths.en;
        const { en } = Status.schema.tree.name.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;
      });
    });

    it('should have weight field', () => {
      const { weight } = Status.schema.tree;
      const { instance } = Status.schema.paths.weight;

      expect(instance).to.be.equal('Number');
      expect(weight).to.exist;
      expect(weight).to.be.an('object');
      expect(weight.type).to.be.a('function');
      expect(weight.type.name).to.be.equal('Number');
      expect(weight.index).to.be.true;
      expect(weight.default).to.exist;
    });

    it('should have color field', () => {
      const { color } = Status.schema.tree;
      const { instance } = Status.schema.paths.color;

      expect(instance).to.be.equal('String');
      expect(color).to.exist;
      expect(color).to.be.an('object');
      expect(color.type).to.be.a('function');
      expect(color.type.name).to.be.equal('String');
      expect(color.trim).to.be.true;
      expect(color.default).to.be.exist;
    });

    it('should have default field', () => {
      const isDefault = Status.path('default');

      expect(isDefault).to.exist;
      expect(isDefault).to.be.instanceof(SchemaTypes.Boolean);
      expect(isDefault.options).to.exist;
      expect(isDefault.options).to.be.an('object');
      expect(isDefault.options.type).to.exist;
      expect(isDefault.options.index).to.be.true;
      expect(isDefault.options.exportable).to.be.true;
      expect(isDefault.options.default).to.be.false;
      expect(isDefault.options.fake).to.exist;
    });
  });
});
